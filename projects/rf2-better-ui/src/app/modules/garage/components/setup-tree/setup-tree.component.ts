import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Setup } from '../../interfaces/setup';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

export interface ExtendedSetup extends Setup {
  isDirectory: boolean;
  isExpanded?: boolean;
  displayName?: string;
}

@Component({
  selector: 'rf-setup-tree',
  templateUrl: './setup-tree.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupTreeComponent {

  private _setups: ExtendedSetup[];

  @Input()
  set setups(values: Setup[]) {
    const extendedSetups: ExtendedSetup[] = values.map((setup: Setup) => {
      const isDirectory: boolean = setup.name.endsWith('\\') && setup.modified === '';
      return {
        ...setup,
        isDirectory,
        displayName: isDirectory ? setup.name : setup.name.split('\\')[1]
      } as ExtendedSetup;
    });
    this.dataSource = new ArrayDataSource<ExtendedSetup>(extendedSetups);
    this._setups = extendedSetups;
  }

  @Output()
  selected: EventEmitter<Setup> = new EventEmitter<Setup>();

  public dataSource: ArrayDataSource<ExtendedSetup>;
  public treeControl: FlatTreeControl<ExtendedSetup> = new FlatTreeControl<ExtendedSetup>(
    (node: ExtendedSetup) => node.isDirectory ? 0 : 1,
    (node: ExtendedSetup) => node.isDirectory);

  public selectedSetup: Setup;
  public isDirectory = (idx: number, node: ExtendedSetup) => node.isDirectory;

  getParentNode(node: ExtendedSetup): ExtendedSetup {
    const nodeIndex: number = this._setups.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this._setups[i].isDirectory && node.name.startsWith(this._setups[i].name)) {
        return this._setups[i];
      }
    }

    return null;
  }

  shouldRender(node: ExtendedSetup): boolean {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  hasChild(node: ExtendedSetup): boolean {
    const nodeIndex: number = this._setups.indexOf(node);
    return !this._setups[nodeIndex + 1]?.isDirectory;
  }

  select(node: ExtendedSetup): void {
    this.selectedSetup = node;
    this.selected.emit(this.selectedSetup);
  }

  trackBy(index: number, item: ExtendedSetup): string {
    return item.name;
  }
}
