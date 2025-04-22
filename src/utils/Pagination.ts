/**
 * @class Pagination
 * @description A class to handle pagination of an array of items.
 * @template T - The type of the items in the array.
 * @property {T[]} array - The array of items to be paginated.
 * @property {number} pageSize - The number of items per page.
 * @method getPage - Returns the items for the specified page number.
 * @method getPageSize - Returns the number of items per page.
 * @method getTotalPages - Returns the total number of pages.
 * @example
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const pagination = new Pagination(items, 3)
 * console.log(pagination.getPage(0)) // [1, 2, 3]
 * console.log(pagination.getPageSize()) // 3
 * console.log(pagination.getTotalPages()) // 4
 */
class Pagination<T> {
  private array: T[]
  private pageSize: number
  private currentPageIndex: number

  constructor(array: T[], pageSize: number) {
    this.array = array
    this.pageSize = pageSize
    this.currentPageIndex = 0
  }

  getAll(): T[] {
    return this.array
  }

  getFirstPage(): T[] {
    return this.getPage(0)
  }

  getLastPage(): T[] {
    const totalPages = this.getTotalPages()
    return this.getPage(totalPages - 1)
  }

  getNextPage(): T[] {
    const totalPages = this.getTotalPages()
    if (this.currentPageIndex < totalPages - 1) this.currentPageIndex++
    return this.getPage(this.currentPageIndex)
  }

  getPreviousPage(): T[] {
    if (this.currentPageIndex > 0) this.currentPageIndex--
    return this.getPage(this.currentPageIndex)
  }

  getPage(pageIndex: number): T[] {
    return this.array.slice(pageIndex * this.pageSize, (pageIndex + 1) * this.pageSize)
  }

  getPageSize(): number {
    return this.pageSize
  }

  getCurrentPageIndex(): number {
    return this.currentPageIndex
  }

  getTotalPages(): number {
    return Math.ceil(this.array.length / this.pageSize)
  }
}

export default Pagination
