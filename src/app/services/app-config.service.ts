import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { Venue } from '../shared/models/venue.interface';

declare const mapsindoors: any;

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private appConfig = new BehaviorSubject<any>({});
    private initVenue = new ReplaySubject<Venue>(1);

    // #region || APP CONFIG
    setAppConfig() {
        return new Promise((resolve, reject) => {
            mapsindoors.AppConfigService.getConfig().then((appConfig) => {
                appConfig.appSettings.title = appConfig.appSettings.title || 'MapsIndoors';
                appConfig.appSettings.displayAliases = JSON.parse(appConfig.appSettings.displayAliases || false);
                this.appConfig.next(appConfig);
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    getAppConfig(): Observable<any> {
        return this.appConfig.asObservable();
    }
    // #endregion

    // #region || INIT VENUE
    /**
     * @description Set initial venue of app.
     * @param {Venue} venue - Venue object.
     * @memberof AppConfigService
     */
    setInitVenue(venue: Venue): void {
        this.initVenue.next(venue);
    }

    /**
     * @description Get venue from app initialization.
     * @returns {Observable<Venue>} - Returns the Venue object.
     * @memberof AppConfigService
     */
    getInitVenue(): Observable<Venue> {
        return this.initVenue.asObservable();
    }
    // #endregion

}