import {
  ComponentFactoryResolver, ComponentRef, Directive, EventEmitter, Input,
  OnChanges, OnDestroy, Output, SimpleChanges, Type, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CardComponent, ChartComponent, FilterComponent, TableComponent } from './blocks.component';
import { PageBlock } from './page.model';

type BlockComponent = CardComponent | TableComponent | FilterComponent | ChartComponent;

@Directive({ selector: '[appDynamicBlock]' })
export class DynamicBlockDirective implements OnChanges, OnDestroy {
  @Input('appDynamicBlock') block!: PageBlock;
  @Input() filter = '';
  @Output() filterChange = new EventEmitter<string>();
  private component?: ComponentRef<BlockComponent>;
  private subscription?: Subscription;

  constructor(private container: ViewContainerRef, private factories: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.block) {
      this.clear();
      switch (this.block.type) {
        case 'card':
          this.component = this.create(CardComponent);
          (this.component.instance as CardComponent).block = this.block;
          break;
        case 'table':
          this.component = this.create(TableComponent);
          (this.component.instance as TableComponent).block = this.block;
          break;
        case 'filter':
          this.component = this.create(FilterComponent);
          const filter = this.component.instance as FilterComponent;
          filter.block = this.block;
          this.subscription = filter.filterChange.subscribe((value: string) => this.filterChange.emit(value));
          break;
        case 'chart':
          this.component = this.create(ChartComponent);
          (this.component.instance as ChartComponent).block = this.block;
          break;
      }
    }
    if (this.component && (this.component.instance instanceof TableComponent || this.component.instance instanceof FilterComponent)) {
      this.component.instance.filter = this.filter;
    }
  }

  ngOnDestroy(): void { this.clear(); }

  private create<T extends BlockComponent>(type: Type<T>): ComponentRef<T> {
    return this.container.createComponent(this.factories.resolveComponentFactory(type));
  }

  private clear(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.container.clear();
    this.component = undefined;
  }
}
