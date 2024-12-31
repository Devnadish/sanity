"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig, NavbarProps, useWorkspace } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { Card, Flex, Stack, Text } from '@sanity/ui'
import { getDefaultDocumentNode } from "./sanity/structure/views";

function CustomNavbar(props: NavbarProps) {
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
      </Flex>
      {props.renderDefault(props)}
    </Stack>
  )
}

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ 
      structure,
      defaultDocumentNode: getDefaultDocumentNode
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "ar", title: "Arabic" },
      ],
      schemaTypes: ["post", "category"],
      weakReferences: true,
    }),
  ],
  studio: {
    components: {
      navbar: CustomNavbar,
    }
  }
});