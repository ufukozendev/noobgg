declare module 'yamljs' {
  const YAML: {
    load(path: string): any;
    parse(yaml: string): any;
    stringify(obj: any, inline?: number, spaces?: number): string;
    dump(obj: any, inline?: number, spaces?: number): string;
  };
  export = YAML;
}
