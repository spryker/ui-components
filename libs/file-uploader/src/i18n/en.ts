import { I18nLocaleDataPackage } from '@spryker/locale';

export default {
    name: 'file-uploader',
    data: {
        'button:upload': 'Upload File',
        'upload:progress': 'Uploading: {{ progress }}%',
        'click:to:upload': 'Click to upload',
        'note:service:items-count': 'You can only upload up to {{ maxFilesNumber }} files.',
        'note:service:item-weight': 'Maximum file size is {{ maxFileSize }}.',
    },
} as I18nLocaleDataPackage;
