import { describe, it, expect } from 'vitest';
import { WatcherSystem } from '../src/utils/WatcherSystem';
import { UserClass } from '../src/models/UserClass';
import { BugTask } from '../src/tasks/BugTask';
import { TaskCategory } from '../src/tasks/TaskCategory';
import type { IUser } from '../src/models/IUser';
import type { ITask } from '../src/tasks/ITask';

describe('WatcherSystem', () => {
  it('watch, unwatch and getWatchers behave as expected', () => {
    const ws = new WatcherSystem<ITask, IUser>();
    const target = new BugTask(1, 'B', TaskCategory.WORKED);
    const u1 = new UserClass(1, 'A', 'a@e.com');
    const u2 = new UserClass(2, 'B', 'b@e.com');
    ws.watch(target, u1);
    ws.watch(target, u2);
    expect(ws.getWatchers(target)).toEqual([u1, u2]);
    ws.unwatch(target, u1);
    expect(ws.getWatchers(target)).toEqual([u2]);
  });

  it('unwatch on non-watched user does nothing', () => {
    const ws = new WatcherSystem<ITask, IUser>();
    const target = new BugTask(1, 'B', TaskCategory.WORKED);
    ws.unwatch(target, new UserClass(9, 'x', 'x@e.com'));
    expect(ws.getWatchers(target)).toEqual([]);
  });

  it('duplicate watchers: adding same watcher twice and unwatch once leaves one', () => {
    const ws = new WatcherSystem<ITask, IUser>();
    const target = new BugTask(2, 'B2', TaskCategory.WORKED);
    const u = new UserClass(5, 'Dup', 'dup@e.com');
    ws.watch(target, u);
    ws.watch(target, u);
    expect(ws.getWatchers(target)).toEqual([u, u]);
    ws.unwatch(target, u);
    expect(ws.getWatchers(target)).toEqual([u]);
  });
});