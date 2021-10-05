import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app.component';
import {FormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {TodoService} from './services/todo.service';
import {TodoState} from './store/todo.state';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxsModule.forRoot([TodoState], {
            developmentMode: !environment.production
        }),
        NgxsLoggerPluginModule.forRoot({
            disabled: environment.production
        }),
    ],
    providers: [
        TodoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
