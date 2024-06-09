export class GenericStore<Type extends Record<string, string | number | Date>> {
  constructor(
    protected readonly storeName: string,
    protected readonly defaultValue: Type,
  ) {}

  get(): Type {
    const raw = localStorage.getItem(this.storeName);

    if (!raw) return this.defaultValue;

    try {
      return JSON.parse(raw) as Type;
    } catch (err) {
      console.warn('Failed to parse stored value', err);
      return this.defaultValue;
    }
  }

  set(payload: Partial<Type>) {
    localStorage.setItem(
      this.storeName,
      JSON.stringify({
        ...this.get(),
        ...payload,
      }),
    );
  }
}
