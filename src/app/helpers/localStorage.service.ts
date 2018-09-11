import { Injectable } from '@angular/core';

@Injectable()

export class LocalStorageService {
    public setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}