import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormatCategoriePipe } from '../pipes/format-categorie.pipe';


@Component({
  selector: 'app-header',
  imports: [RouterLink,FormatCategoriePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'tp01_ANGULAR_ePsi';

}
