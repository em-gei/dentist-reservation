import { Component } from '@angular/core';
import { Registry } from './shared/models/registry-model';
import { RegistryService } from './shared/services/registry-service/registry.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-client';

  constructor(private registryService: RegistryService) { }

  findAllRegistry() {
    this.registryService.findAll().subscribe((res: Registry[])  => {
        console.log(res);
    });
  }
  
}
