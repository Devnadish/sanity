"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        preview: "/",
        previewMode: {
          enable: "/draft-mode/enable",
        },
      },
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "ar", title: "Arabic" },
      ],
      schemaTypes: ["post", "category", "blog"],
      weakReferences: true
    }),
  ],
});

// "use client";

// import { visionTool } from "@sanity/vision";
// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";
// import { presentationTool } from "sanity/presentation";
// import { documentInternationalization } from "@sanity/document-internationalization";

// import { apiVersion, dataset, projectId } from "./sanity/env";
// import { schema } from "./sanity/schemaTypes";
// import { structure } from "./sanity/structure";

// export default defineConfig({
//   basePath: "/studio",
//   projectId,
//   dataset,
//   schema,
//   plugins: [
//     structureTool({ structure }),
//     visionTool({ defaultApiVersion: apiVersion }),
//     presentationTool({
//       previewUrl: {
//         preview: "/",
//         previewMode: {
//           enable: "/draft-mode/enable",
//         },
//       },
//     }),
//     documentInternationalization({
//       supportedLanguages: [
//         { id: "en", title: "English" },
//         { id: "ar", title: "Arabic" },
//       ],
//       schemaTypes: ["post", "category","blog"],
//       weakReferences: true
//     }),
//   ],
// });