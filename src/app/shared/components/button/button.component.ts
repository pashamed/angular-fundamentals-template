import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() text: string = "";
  @Input() icon: IconDefinition | null = null;
  @Input() disabled: boolean = false;
  @Input() type: string = "submit";
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.buttonClick.emit();
  }
}
