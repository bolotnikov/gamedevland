export interface AcademyCourse {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly {
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    readonly outcome: string;
    readonly prerequisites: string;
  }[];
}
