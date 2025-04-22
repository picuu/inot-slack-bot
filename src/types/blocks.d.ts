export interface Block {
  type: string
  text?: Text
  elements?: Element[]
}

export interface Text {
  type: string
  text: string
}

export interface Element {
  type: string
  /* biome-ignore lint/suspicious/noExplicitAny: no types for blocks exists, any is correct here */
  text: any
  value?: string
}
