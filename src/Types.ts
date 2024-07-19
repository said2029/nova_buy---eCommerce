import * as zod from "zod";

const CategorySchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  image: zod.string(),
  subcategories: zod.array(zod.string()),
});

export {CategorySchema}
