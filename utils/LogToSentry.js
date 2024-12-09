import * as Sentry from "@sentry/react-native";

export const LogToSentry = (error, context = {}) => {
  const defaultContext = {
    // environment: __DEV__ ? "development" : "production",
    platform: Platform.OS, // iOS, Android, Web
    timestamp: new Date().toISOString(),
    appVersion: "1.0.0",
  };

  if (error.response) {
    context.apiResponse = {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    };
  }

  if (error.request) {
    context.apiRequest = {
      url: error.request.responseURL,
      method: error.config?.method,
      headers: error.config?.headers,
    };
  }

  if (context.user) {
    Sentry.setUser(context.user);
  }

  // Hata raporunu gönder
  Sentry.captureException(error, {
    tags: {
      section: context.section || "general",
      feature: context.feature || "unknown",
    },
    extra: {
      ...defaultContext,
      ...context,
      errorMessage: error.message || "No error message",
      stackTrace: error.stack || "No stack trace",
    },
  });

  console.error("Logged to Sentry:", { error, context });
};

/*

USAGE EXAMPLE:

LogToSentry(error, {
      section: "user-interaction",
      feature: "submit-button",
      user: {
        id: "12345",
        email: "user@example.com",
      },
    });
*/

/*

USAGE EXAMPLE TWO:

    LogToSentry(error, {
      section: "fetch-featured-projects",
      feature: "project-listing",
      apiUrl: `${apiUrl}featured-projects`,
    });

*/
