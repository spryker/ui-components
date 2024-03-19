import { NgModule } from '@angular/core';
import { provideIcons } from '@spryker/icon';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 22" version="1.1">
  <path d="M13.2869988,11.4689537 L13.4142136,11.5857864 L17,15.172 L17,13.5 C17,10.8925926 20.8241975,10.8346502 20.9941619,13.3261728 L21,13.5 L21,20 L20.9994866,20.0454567 L20.9981955,20.0852048 L20.9981955,20.0852048 L20.997,20.097 L20.9907064,20.1940538 L20.9907064,20.1940538 C20.9881637,20.2194128 20.9852188,20.2447699 20.9817895,20.2700739 C20.9775835,20.3021794 20.972517,20.3338707 20.9667154,20.3653043 C20.9620217,20.3897948 20.9569838,20.4144627 20.9514772,20.4390468 L20.9356514,20.5051769 L20.9356514,20.5051769 C20.9283949,20.532433 20.9206812,20.5597175 20.9123774,20.5868602 C20.9046592,20.6124825 20.8964082,20.6375811 20.8876795,20.6624549 C20.8800776,20.683931 20.8719799,20.7058375 20.8634858,20.7276251 C20.8480076,20.7673004 20.8314441,20.8059737 20.8137201,20.8439972 L20.8036561,20.8654509 L20.8036561,20.8654509 L20.7958292,20.8813586 C20.7522486,20.9699893 20.7022999,21.0549236 20.64658,21.1355648 L20.6397152,21.1457206 C20.6258447,21.165522 20.6115737,21.1851283 20.5969023,21.2045282 C20.5799753,21.2267203 20.5624926,21.2488811 20.5445583,21.2706561 C20.5310162,21.2871983 20.5176206,21.3029316 20.5039421,21.3185031 C20.4832631,21.3420167 20.4616154,21.3655492 20.4394214,21.3885511 C20.4308243,21.397458 20.4225636,21.4058635 20.4142136,21.4142136 L20.3835197,21.4442592 L20.3533752,21.4725555 L20.3533752,21.4725555 L20.382,21.444 L20.332,21.49 L20.2693418,21.5457513 L20.2693418,21.5457513 C20.2417108,21.568358 20.2134576,21.5903515 20.1846136,21.6115891 L20.1427815,21.64177 L20.1427815,21.64177 C20.058319,21.7005046 19.9687198,21.7532703 19.8750216,21.7989312 L19.8654509,21.8036561 C19.8473854,21.8123247 19.8292167,21.8207062 19.8109516,21.8288008 C19.7835698,21.8409147 19.7560882,21.8523866 19.7283042,21.8632549 C19.7117689,21.8696778 19.69483,21.8760266 19.677825,21.8821379 C19.6418228,21.8951801 19.6054325,21.9071148 19.5685988,21.9180174 L19.5308942,21.9286095 L19.5308942,21.9286095 C19.4952856,21.9385528 19.4592856,21.9473709 19.4229181,21.9552 C19.4037251,21.9591538 19.3844125,21.9630158 19.3650573,21.9665909 C19.3323727,21.972791 19.2993039,21.9780404 19.2659757,21.9824691 C19.2447482,21.9851739 19.2233969,21.9876752 19.2020175,21.9898331 C19.1843708,21.991692 19.1668482,21.9932168 19.1492623,21.9945143 L19.1108902,21.9969425 C19.0907734,21.9980528 19.0706431,21.9988606 19.0505067,21.9993661 L19,22 L12.5,22 C11.3954305,22 10.5,21.1045695 10.5,20 C10.5,18.9456382 11.3158778,18.0818349 12.3507377,18.0054857 L12.5,18 L14.172,18 L10.5857864,14.4142136 C9.80473785,13.633165 9.80473785,12.366835 10.5857864,11.5857864 C11.3257272,10.8458457 12.5012114,10.8069014 13.2869988,11.4689537 Z M0.00929360727,1.80594617 C0.011836278,1.78058717 0.0147812195,1.75523011 0.0182104939,1.72992611 C0.0224164827,1.69782056 0.0274830344,1.6661293 0.0332846127,1.63469566 C0.0379783374,1.61020521 0.0430162056,1.58553728 0.0485227517,1.56095316 L0.0643486335,1.49482305 L0.0643486335,1.49482305 C0.0716051443,1.46756697 0.0793187728,1.44028245 0.0876226054,1.41313976 C0.0953407705,1.38751747 0.10359177,1.36241889 0.112320502,1.33754506 C0.119922414,1.31606904 0.128020105,1.29416254 0.136514179,1.27237493 C0.151992449,1.23269959 0.168555934,1.19402626 0.186279918,1.15600281 L0.196343931,1.13454909 L0.196343931,1.13454909 L0.204170819,1.11864136 C0.247751425,1.03001075 0.297700122,0.945076407 0.353420014,0.864435237 L0.360284841,0.854279392 C0.374155306,0.834477952 0.388426265,0.814871661 0.40309772,0.795471788 C0.420024694,0.773279711 0.437507433,0.75111889 0.455441693,0.729343887 C0.468983775,0.712801659 0.482379377,0.697068398 0.49605786,0.681496877 C0.516736889,0.657983299 0.538384628,0.634450822 0.560578607,0.611448913 C0.569175654,0.602541954 0.577436412,0.594136464 0.585786438,0.585786438 L0.616480304,0.555740761 L0.646,0.527 L0.617,0.555 L0.667,0.509 L0.730658227,0.454248739 L0.730658227,0.454248739 C0.758289195,0.431641957 0.78654239,0.409648539 0.815386365,0.388410911 L0.857218519,0.358229989 L0.857218519,0.358229989 C0.941680962,0.299495419 1.03128024,0.246729686 1.12497839,0.201068757 L1.13454909,0.196343931 C1.15261457,0.187675324 1.1707833,0.179293758 1.18904844,0.171199232 C1.21643024,0.159085276 1.24391177,0.147613425 1.2716958,0.136745084 C1.28823114,0.130322217 1.30516996,0.123973356 1.322175,0.117862147 C1.35817716,0.104819942 1.39456752,0.0928852065 1.43140117,0.0819825994 L1.46910581,0.0713905129 L1.46910581,0.0713905129 C1.50471437,0.0614471786 1.54071436,0.0526291302 1.57708189,0.0448000044 C1.59627488,0.0408461534 1.61558749,0.0369841909 1.63494269,0.0334091469 C1.66762727,0.0272090414 1.70069615,0.0219596068 1.73402429,0.017530906 C1.75525184,0.0148261287 1.7766031,0.0123247922 1.79798248,0.0101669445 C1.81562918,0.00830800852 1.8331518,0.00678317283 1.85073766,0.00548573643 L1.88910982,0.00305748902 C1.90922655,0.00194724697 1.92935685,0.00113937004 1.94949333,0.000633858247 L8.5,0 C9.6045695,0 10.5,0.8954305 10.5,2 C10.5,3.0543618 9.68412221,3.91816512 8.64926234,3.99451426 L8.5,4 L6.828,4 L10.4142136,7.58578644 C11.1952621,8.36683502 11.1952621,9.63316498 10.4142136,10.4142136 C9.6742728,11.1541543 8.49878864,11.1930986 7.71300121,10.5310463 L7.58578644,10.4142136 L4,6.828 L4,8.5 C4,11.1074074 0.175802469,11.1653498 0.00583813443,8.67382716 L0,8.5 L0.00051342518,1.95454326 L0.00180451216,1.91479522 L0.00180451216,1.91479522 L0.00234126279,1.9023685 L0.00234126279,1.9023685 L0.00388131645,1.87507428 L0.00388131645,1.87507428 L0.003,1.895 L0.00929360727,1.80594617 L0.00929360727,1.80594617 Z" />
</svg>
`;

@NgModule({
    providers: [provideIcons([IconMaximizeModule])],
})
export class IconMaximizeModule {
    static icon = 'maximize';
    static svg = svg;
}
