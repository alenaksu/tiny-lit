import { withProps } from './withProps';
import { withElement } from './withElement';

export const Element = withProps(withElement(HTMLElement));
