import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector : 'audio',
    exportAs : 'MyAudio'
})

export class MyAudioDirective {
    private audioPlayer : HTMLAudioElement;

    constructor (element : ElementRef) {
        this.audioPlayer = element.nativeElement;
    }

    stop () {
        this.audioPlayer.pause();
    }
}