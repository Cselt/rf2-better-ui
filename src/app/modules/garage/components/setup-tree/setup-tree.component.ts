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
  setupsLoading: boolean;

  @Input()
  activeSetupName: string;

  @Input()
  compareToSetup: string;

  @Input()
  currentTrackFolder: string;

  @Input()
  set setups(values: Setup[]) {
    values = values.filter((s: Setup) => s.name !== '<Factory Defaults>');

    const extendedSetups: ExtendedSetup[] = values
      .map((setup: Setup) => {
        const isDirectory: boolean = setup?.name.endsWith('\\') && setup?.modified === '';
        return {
          ...setup,
          isDirectory,
          displayName: setup.name.split('\\')[isDirectory ? 0 : 1]
        } as ExtendedSetup;
      })
      .filter((setup: ExtendedSetup, index: number, array: ExtendedSetup[]) => {
        // We need to keep leafs
        if (!setup.isDirectory) {
          return true;
        }

        if (index === array.length - 1) {
          return false;
        }

        // Remove empty directories
        return !array[index + 1]?.isDirectory;
      });
    console.warn('setus ', extendedSetups);
    this.dataSource = new ArrayDataSource<ExtendedSetup>(extendedSetups);
    this._setups = extendedSetups;
  }

  @Output()
  selected: EventEmitter<Setup> = new EventEmitter<Setup>();

  public dataSource: ArrayDataSource<ExtendedSetup>;
  public treeControl: FlatTreeControl<ExtendedSetup> = new FlatTreeControl<ExtendedSetup>(
    (node: ExtendedSetup) => (node.isDirectory ? 0 : 1),
    (node: ExtendedSetup) => node.isDirectory
  );

  public selectedSetup: Setup;
  public filter: string = '';
  public isDirectory = (idx: number, node: ExtendedSetup): boolean => node.isDirectory;

  getParentNode(node: ExtendedSetup): ExtendedSetup {
    const nodeIndex: number = this._setups.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this._setups[i].isDirectory && node.name.startsWith(this._setups[i].name)) {
        return this._setups[i];
      }
    }

    return null;
  }

  shouldRenderLeaf(node: ExtendedSetup): boolean {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  shouldRenderNode(node: ExtendedSetup): boolean {
    const allowedByFilter: boolean = node.displayName.toLowerCase().includes(this.filter.toLowerCase());
    const nodeIndex: number = this._setups.indexOf(node);

    // Last item
    if (nodeIndex === this._setups.length - 1) {
      return !node.isDirectory;
    }

    return !this._setups[nodeIndex + 1]?.isDirectory && allowedByFilter;
  }

  select(node: ExtendedSetup): void {
    this.selectedSetup = node;
    this.selected.emit(this.selectedSetup);
  }

  trackBy(index: number, item: ExtendedSetup): string {
    return item.name;
  }
}
