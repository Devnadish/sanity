import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { jobs } from "./jobs";
import { jobsType } from "./jobsType";
import { departmentType } from "./departmentType";
import { blogType } from "./blogType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    blogType,
    jobs,
    jobsType,
    departmentType,
  ],
};
