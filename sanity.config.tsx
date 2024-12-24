"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, NavbarProps, useWorkspace } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import KhalidNadish from "./components/khalidnadish";
import { Card, Flex, Stack, Text } from '@sanity/ui'



function CustomNavbar(props: NavbarProps) {
  const w = useWorkspace()
  console.log(w)
  const { dataset, projectId } = useWorkspace()

  return (
    <Stack>
      <Flex padding={3} justify="space-between" align="center" style={{ width: '100%' }}>

        <Card tone="critical" padding={3} style={{ flexGrow: 1 }}>
          <Text size={1}>dataSet: <b>{dataset}</b></Text>
        </Card>
        <Card tone="primary" padding={3} style={{ flexGrow: 1 }}>
          <Text size={1}>Project: <b>{projectId}</b></Text>
        </Card>
        <Card tone="primary" padding={3} style={{ flexGrow: 1 }}>
          <Text size={1}>Api: <b>{apiVersion}</b></Text>
        </Card>
        <Card tone="positive" padding={3} style={{ flexGrow: 1 }}  >
          <Text size={1} weight="bold" align="right">
            <a href="https://your-link-here.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              Khalid Nadish
            </a>
          </Text></Card>

      </Flex>

      {props.renderDefault(props)} {/* Render the default navbar */}
    </Stack>
  )
}





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
      weakReferences: true,
    }),
  ],
  studio: {
    components: {
      navbar: CustomNavbar,
    }
  }
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
