import { describe, it, expect } from 'vitest';
import { Paginator } from '../src/utils/Paginator';
import { UserClass } from '../src/models/UserClass';
import type { IUser } from '../src/models/IUser';

describe('Paginator', () => {
  const paginator = new Paginator<IUser>();
  const items: IUser[] = [
    new UserClass(1, 'A', 'a@e.com'),
    new UserClass(2, 'B', 'b@e.com'),
    new UserClass(3, 'C', 'c@e.com'),
    new UserClass(4, 'D', 'd@e.com'),
    new UserClass(5, 'E', 'e@e.com'),
  ];

  it('paginates correctly for normal pages', () => {
    expect(paginator.paginate(items, 1, 2)).toEqual([items[0], items[1]]);
    expect(paginator.paginate(items, 2, 2)).toEqual([items[2], items[3]]);
    expect(paginator.paginate(items, 3, 2)).toEqual([items[4]]);
  });

  it('returns empty array for out-of-range pages or invalid page/size', () => {
    expect(paginator.paginate(items, 0, 2)).toEqual([]);
    expect(paginator.paginate(items, -1, 2)).toEqual([]);
    expect(paginator.paginate(items, 10, 2)).toEqual([]);
    expect(paginator.paginate([], 1, 2)).toEqual([]);
  });

  it('handles page size larger than total items', () => {
    expect(paginator.paginate(items, 1, 99)).toEqual(items);
    expect(paginator.paginate(items, 2, 99)).toEqual([]);
  });
});