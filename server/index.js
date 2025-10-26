import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, BrowserRouter, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, useParams, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(BrowserRouter, {
    basename: "/movie-poster-viewer/",
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function PostBox({
  movies
}) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 justify-center items-center p-4", children: movies.map((movie) => /* @__PURE__ */ jsxs(
    Link,
    {
      to: `/movie/${movie.id}`,
      state: { movie },
      className: "border-2 border-gray-300 rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer flex flex-col items-center justify-center",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: movie.medium_cover_image,
            alt: movie.title,
            className: "w-full h-full object-cover rounded-md"
          }
        ),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: movie.title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: movie.year }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          "⭐ ",
          movie.rating
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          movie.runtime,
          " minutes"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: movie.genres.join(", ") })
      ]
    },
    movie.id
  )) });
}
function meta() {
  return [{
    title: "movie poster viewer"
  }, {
    name: "description",
    content: "View movie posters"
  }, {
    name: "keywords",
    content: "movie, poster, viewer"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year");
    const data = await response.json();
    setMovies(data.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "p-4 ",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-2xl font-bold text-center",
      children: "Movies"
    }), loading ? /* @__PURE__ */ jsx("div", {
      className: "text-2xl font-bold text-center",
      children: "Loading..."
    }) : /* @__PURE__ */ jsx("div", {
      className: "flex justify-center items-center",
      children: /* @__PURE__ */ jsx(PostBox, {
        movies
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function MovieDetail() {
  const {
    movieId
  } = useParams();
  const location = useLocation();
  const {
    movie
  } = location.state;
  return /* @__PURE__ */ jsx("div", {
    className: "p-4 flex flex-col gap-4",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex gap-4",
      children: [/* @__PURE__ */ jsx("img", {
        src: movie.medium_cover_image,
        alt: movie.title,
        className: "w-1/3 h-auto object-cover rounded-md"
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-2",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold",
          children: movie.title
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-gray-500",
          children: movie.year
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-gray-500",
          children: movie.rating
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-gray-500",
          children: movie.runtime
        }), /* @__PURE__ */ jsx("p", {
          className: "text-sm text-gray-500",
          children: movie.genres.join(", ")
        })]
      })]
    })
  });
}
const movie_detail = UNSAFE_withComponentProps(MovieDetail);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: movie_detail
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/movie-poster-viewer/assets/entry.client-aTX8036r.js", "imports": ["/movie-poster-viewer/assets/chunk-OIYGIGL5-BJm-FVer.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/movie-poster-viewer/assets/root-CBXR_4zZ.js", "imports": ["/movie-poster-viewer/assets/chunk-OIYGIGL5-BJm-FVer.js"], "css": ["/movie-poster-viewer/assets/root-DtXiUyyt.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/movie-poster-viewer/assets/home-BTOkJ_q3.js", "imports": ["/movie-poster-viewer/assets/chunk-OIYGIGL5-BJm-FVer.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/movie/movie_detail": { "id": "routes/movie/movie_detail", "parentId": "root", "path": "movie/:movie_id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/movie-poster-viewer/assets/movie_detail-C2KUXNv6.js", "imports": ["/movie-poster-viewer/assets/chunk-OIYGIGL5-BJm-FVer.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/movie-poster-viewer/assets/manifest-9e82eec6.js", "version": "9e82eec6", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/movie-poster-viewer/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/movie/movie_detail": {
    id: "routes/movie/movie_detail",
    parentId: "root",
    path: "movie/:movie_id",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
