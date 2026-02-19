import { WatchedList } from "./watched-list.js";

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("WatchedList", () => {
  it("should be able to create a watched list with initial items", () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    expect(watchedList.currentItems).toEqual([1, 2, 3]);
    expect(watchedList.getNewItems()).toEqual([]);
    expect(watchedList.getRemovedItems()).toEqual([]);
  });

  it("should be able to add new items to the watched list", () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.add(4);
    watchedList.add(5);

    expect(watchedList.currentItems).toEqual([1, 2, 3, 4, 5]);
    expect(watchedList.getNewItems()).toEqual([4, 5]);
    expect(watchedList.getRemovedItems()).toEqual([]);
  });

  it("should be able to remove items from the watched list", () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.remove(2);
    watchedList.remove(3);

    expect(watchedList.currentItems).toEqual([1]);
    expect(watchedList.getNewItems()).toEqual([]);
    expect(watchedList.getRemovedItems()).toEqual([2, 3]);
  });

  it("should be able to add and remove items from the watched list", () => {
    const watchedList = new NumberWatchedList([1, 2, 3]);

    watchedList.add(4);
    watchedList.remove(2);

    expect(watchedList.currentItems).toEqual([1, 3, 4]);
    expect(watchedList.getNewItems()).toEqual([4]);
    expect(watchedList.getRemovedItems()).toEqual([2]);
  });
});
