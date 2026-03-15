import { AccordionContent } from "./AccordionContent";
import { AccordionRoot } from "./AccordionRoot";
import { AccordionTrigger } from "./AccordionTrigger";

export const Accordion = Object.assign(AccordionRoot, {
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
