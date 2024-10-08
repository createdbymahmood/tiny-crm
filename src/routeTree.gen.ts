/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnauthRouteImport } from './routes/_unauth/route'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthCustomersRouteImport } from './routes/_auth/customers/route'
import { Route as UnauthAuthLoginImport } from './routes/_unauth/auth/login'
import { Route as AuthCustomersCreateImport } from './routes/_auth/customers/create'
import { Route as AuthCustomersCustomerIdImport } from './routes/_auth/customers/$customerId'
import { Route as AuthCustomersCustomerIdUpdateImport } from './routes/_auth/customers/$customerId_.update'

// Create/Update Routes

const UnauthRouteRoute = UnauthRouteImport.update({
  id: '/_unauth',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthCustomersRouteRoute = AuthCustomersRouteImport.update({
  path: '/customers',
  getParentRoute: () => AuthRouteRoute,
} as any)

const UnauthAuthLoginRoute = UnauthAuthLoginImport.update({
  path: '/auth/login',
  getParentRoute: () => UnauthRouteRoute,
} as any)

const AuthCustomersCreateRoute = AuthCustomersCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthCustomersRouteRoute,
} as any)

const AuthCustomersCustomerIdRoute = AuthCustomersCustomerIdImport.update({
  path: '/$customerId',
  getParentRoute: () => AuthCustomersRouteRoute,
} as any)

const AuthCustomersCustomerIdUpdateRoute =
  AuthCustomersCustomerIdUpdateImport.update({
    path: '/$customerId/update',
    getParentRoute: () => AuthCustomersRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_unauth': {
      id: '/_unauth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/customers': {
      id: '/_auth/customers'
      path: '/customers'
      fullPath: '/customers'
      preLoaderRoute: typeof AuthCustomersRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/customers/$customerId': {
      id: '/_auth/customers/$customerId'
      path: '/$customerId'
      fullPath: '/customers/$customerId'
      preLoaderRoute: typeof AuthCustomersCustomerIdImport
      parentRoute: typeof AuthCustomersRouteImport
    }
    '/_auth/customers/create': {
      id: '/_auth/customers/create'
      path: '/create'
      fullPath: '/customers/create'
      preLoaderRoute: typeof AuthCustomersCreateImport
      parentRoute: typeof AuthCustomersRouteImport
    }
    '/_unauth/auth/login': {
      id: '/_unauth/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof UnauthAuthLoginImport
      parentRoute: typeof UnauthRouteImport
    }
    '/_auth/customers/$customerId/update': {
      id: '/_auth/customers/$customerId/update'
      path: '/$customerId/update'
      fullPath: '/customers/$customerId/update'
      preLoaderRoute: typeof AuthCustomersCustomerIdUpdateImport
      parentRoute: typeof AuthCustomersRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRouteRoute: AuthRouteRoute.addChildren({
    AuthCustomersRouteRoute: AuthCustomersRouteRoute.addChildren({
      AuthCustomersCustomerIdRoute,
      AuthCustomersCreateRoute,
      AuthCustomersCustomerIdUpdateRoute,
    }),
  }),
  UnauthRouteRoute: UnauthRouteRoute.addChildren({ UnauthAuthLoginRoute }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_unauth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/customers"
      ]
    },
    "/_unauth": {
      "filePath": "_unauth/route.tsx",
      "children": [
        "/_unauth/auth/login"
      ]
    },
    "/_auth/customers": {
      "filePath": "_auth/customers/route.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/customers/$customerId",
        "/_auth/customers/create",
        "/_auth/customers/$customerId/update"
      ]
    },
    "/_auth/customers/$customerId": {
      "filePath": "_auth/customers/$customerId.tsx",
      "parent": "/_auth/customers"
    },
    "/_auth/customers/create": {
      "filePath": "_auth/customers/create.tsx",
      "parent": "/_auth/customers"
    },
    "/_unauth/auth/login": {
      "filePath": "_unauth/auth/login.tsx",
      "parent": "/_unauth"
    },
    "/_auth/customers/$customerId/update": {
      "filePath": "_auth/customers/$customerId_.update.tsx",
      "parent": "/_auth/customers"
    }
  }
}
ROUTE_MANIFEST_END */
