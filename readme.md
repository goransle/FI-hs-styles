# URL-parametere

Chartene kan endres på med å sette forskjellige URL-parametere. For eksempel kan ein bytte tema med å legge til `?theme=light` i URLen. 

Om ein vil bytte rekneark kan ein legge til `?spreadsheetID=1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw&spreadsheetKey=2`

## Oversikt over parametere

Parameter  | Verdier | Beskrivelse
-----|-----|-----
**theme** | `dark` <br> `light` | Bytter fargetema.
**cycle**| `true` <br> `false` | "Cycler" gjennom serier i grafen. Om det kun er en serie vil den gå gjennom hvert punkt i serien.
**cycleSpeed** | tall | Antall millisekunder før "cycle"-funksjonen går til neste serie/punkt.
**spreadsheetID** | Google spreadsheets ID | Finnes i URLen til et delt Google regneark. F.eks `1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw`. Regnearket må vere publisert for at dette skal fungere.
**spreadsheetKey** | tall (1...n) | Hvilken fane i regnearket charten skal hente data fra.
**exporting** | `true` <br> `false` | Om `true`, så vises eksport-menyen, som lar ein laste ned charten i forskjellige bilde-format.
**legend** | `true` <br> `false` | Om satt til `false` så blir legend slått av.
**polling** | `true` <br> `false` | Skrur på automatisk innhenting av data
**pollingRate** | tall | antall sekunder mellom innhenting av data