import { I18nLocaleDataPackage } from '@spryker/locale';

export default {
    name: 'file-uploader',
    data: {
        'button:upload': 'Datei hochladen',
        'upload:progress': 'Hochladen: {{ progress }}%',
        'click:to:upload': 'Klicken zum Hochladen',
        'note:service:items-count': 'Sie können nur bis zu {{ maxFilesNumber }} Dateien hochladen.',
        'note:service:item-weight': 'Die maximale Dateigröße beträgt {{ maxFileSize }}.',
    },
} as I18nLocaleDataPackage;
