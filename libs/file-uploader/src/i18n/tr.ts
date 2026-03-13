import { I18nLocaleDataPackage } from '@spryker/locale';

export default {
    name: 'file-uploader',
    data: {
        'button:upload': 'Dosya Yükle',
        'upload:progress': 'Yükleniyor: {{ progress }}%',
        'click:to:upload': 'Yüklemek için tıklayın',
        'note:service:items-count': 'En fazla {{ maxFilesNumber }} dosya yükleyebilirsiniz.',
        'note:service:item-weight': 'Maksimum dosya boyutu {{ maxFileSize }}.',
    },
} as I18nLocaleDataPackage;
