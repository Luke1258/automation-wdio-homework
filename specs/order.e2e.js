import { getFieldValueById } from '../pages/functions.js'
import {
    ICO,
    clientName,
    address,
    substituteName,
    contactName,
    contactPhone,
    contactEmail,
    startDate,
    endDate
} from './fixtures.js'

describe('Objednávka pro MŠ/ZŠ', () => {

    // testy sem :)

    beforeEach(() => {
        browser.reloadSession();
        browser.url('/objednavka/pridat');
    });

    it('Spravne vyplnenie objednavky', () => {
        
        const card = $('.card');
        expect(card).toBeDisplayed();

        const ico = $('#ico');
        expect(ico).toBeEnabled();

        ico.setValue(ICO);
        browser.keys('Enter');
        browser.pause(5000);

        // expect(odberatel.getText()).toEqual(clientName);
        const odberatel = getFieldValueById('client');
        console.log('Odberatel je: ' + odberatel);
        expect(odberatel).toEqual(clientName);

        const adresa = getFieldValueById('address');
        console.log('Uplna adresa je: ' + adresa);
        expect(adresa).toEqual(address);

        const zastoupena = $('#substitute');
        zastoupena.setValue(substituteName);

        const kontaknaOsoba = $('#contact_name');
        kontaknaOsoba.setValue(contactName);

        const telefon = $('#contact_tel');
        telefon.setValue(contactPhone);

        const email = $('#contact_mail');
        email.setValue(contactEmail);

        const zaciatok = $('#start_date_1');
        zaciatok.setValue(startDate);

        const koniec = $('#end_date_1');
        koniec.setValue(endDate);

        const primestkyTabor = $('#nav-home-tab');
        primestkyTabor.click();

        const kurz = $('#camp-date_part');
        kurz.selectByIndex(0);

        const pocetDeti = $('#camp-students');
        pocetDeti.setValue('3');

        const vek = $('#camp-age');
        vek.setValue('18');

        const pocetPedagDoprovodu = $('#camp-adults');
        pocetPedagDoprovodu.setValue(2);

        const ulozit = $('.btn-primary');
        ulozit.click();

    });

    it('Nespravne vyplnenie objednavky', () => {
        const ico = $('#ico');
        ico.setValue('INVALID');
        browser.keys('Enter');

        const toastMessage = $('.toast-message');
        console.log(toastMessage.getText());
        toastMessage.waitForDisplayed({reverse: true});
    });
    
});
