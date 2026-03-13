import { I18nLocaleDataPackage } from '@spryker/locale';

export default {
    name: 'file-uploader',
    data: {
        'button:upload': 'Ανέβασμα Αρχείου',
        'upload:progress': 'Μεταφόρτωση: {{ progress }}%',
        'click:to:upload': 'Κάντε κλικ για να ανεβάσετε',
        'note:service:items-count': 'Μπορείτε να ανεβάσετε μόνο έως {{ maxFilesNumber }} αρχεία.',
        'note:service:item-weight': 'Το μέγιστο μέγεθος αρχείου είναι {{ maxFileSize }}.',
    },
} as I18nLocaleDataPackage;
