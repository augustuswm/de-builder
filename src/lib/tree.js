// @flow

export default class Tree<T> {
  trees: Array<Tree<T>>;
  value: T;

  constructor(value: T, trees: ?Array<Tree<T>>) {
    this.trees = trees || [];
    this.value = value;
  }

  addAt(tree: Tree<T>, index: number): Tree<T> {
    this.trees.splice(index, 0, tree);
    return this;
  }

  add(tree: Tree<T>): Tree<T> {
    this.trees.push(tree);
    return this;
  }

  removeAt(index: number): Tree<T> {
    this.trees.splice(index, 1);
    return this;
  }

  remove(tree: Tree<T>): Tree<T> {
    this.trees = this.trees.filter(t => t !== tree);
    return this;
  }

  get(index: number): ?Tree<T> {
    return this.trees[index];
  }

  setValue(value: T): Tree<T> {
    this.value = value;
    return this;
  }

  getValue(): T {
    return this.value;
  }

  children(): Array<Tree<T>> {
    return this.trees;
  }

  map<R>(f: T => R): Tree<R> {
    return new Tree(
      f(this.value),
      this.trees.map(tree => tree.map(f))
    );
  }

  flatMap<R>(f: (T, Array<R>) => R): R {
    return f(this.value, this.trees.map(t => t.flatMap(f)));
  }

  toObject() {
    return {
      value: this.value,
      trees: this.trees.map(t => t.toObject())
    };
  }

  toJSON(): string {
    return JSON.stringify(this.toObject());
  }

  static fromObject(input: Object): Tree<T> {
    return new Tree(input.value, input.trees.map(o => Tree.fromObject(o)));
  }

  static fromJSON(input: string): Tree<T> {
    return Tree.fromObject(JSON.parse(input));
  }

  find(f: T => bool): Tree<T>|null {
    if (f(this.value)) {
      return this;
    }

    return this.trees.reduce(function(found, t) {
      if (found === null) {
        return t.find(f);
      } else {
        return found;
      }
    }, null);
  }
}