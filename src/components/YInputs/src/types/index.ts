export type ComponentType = 'text' | 'number' | 'dropdown' | 'date' | 'codemirror';

export interface IFormKitProps {
  type: ComponentType;
  label?: string;
  help?: string;
  name?: string;
}

export interface ISchema {
  schema: [IFormKitProps];
}

export interface IOptions {
  label: string;
  value: string;
}
