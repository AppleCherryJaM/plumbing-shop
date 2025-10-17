// admin/src/pages/Import/ImportPage.tsx
import { useState, type SyntheticEvent } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import FileUpload from '../components/FileUpload';
import type { FileUpload as FileUploadType, ImportResult, UploadConfig } from '../types';

const ImportPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [importResults, setImportResults] = useState<ImportResult | null>(null);

  const handleFilesUpload = (successfulFiles: FileUploadType[]): void => {
    setImportResults({
      success: successfulFiles.length,
      total: successfulFiles.length,
      files: successfulFiles
    });
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number): void => {
    setActiveTab(newValue);
    setImportResults(null);
  };

  const getUploadConfig = (): UploadConfig => {
    switch (activeTab) {
      case 0: // Товары
        return {
          title: 'Импорт товаров',
          description: 'Загрузите XML/CSV файл с товарами',
          acceptedTypes: ['.xml', '.csv'],
          endpoint: '/api/admin/import/products'
        };
      case 1: // Цены
        return {
          title: 'Импорт цен',
          description: 'Загрузите CSV файл с обновлением цен',
          acceptedTypes: ['.csv'],
          endpoint: '/api/admin/import/prices'
        };
      case 2: // Остатки
        return {
          title: 'Импорт остатков',
          description: 'Загрузите CSV файл с обновлением остатков',
          acceptedTypes: ['.csv'],
          endpoint: '/api/admin/import/stock'
        };
      default:
        return {
          title: '',
          description: '',
          acceptedTypes: [],
          endpoint: ''
        };
    }
  };

  const config = getUploadConfig();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Импорт данных
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Товары" />
          <Tab label="Цены" />
          <Tab label="Остатки" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {config.title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {config.description}
        </Typography>

        <FileUpload
          onFilesUpload={handleFilesUpload}
          acceptedTypes={config.acceptedTypes}
        />

        {importResults && (
          <Alert 
            severity="success" 
            sx={{ mt: 2 }}
          >
            Успешно загружено {importResults.success} из {importResults.total} файлов
          </Alert>
        )}
      </Paper>

      {/* Инструкция по формату файлов */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Формат файлов
        </Typography>
        
        <Box component="ul" sx={{ pl: 2 }}>
          <li>
            <strong>XML для товаров:</strong> Должен содержать поля name, price, category, brand
          </li>
          <li>
            <strong>CSV для цен:</strong> Колонки: product_id, retail_price, wholesale_price
          </li>
          <li>
            <strong>CSV для остатков:</strong> Колонки: product_id, warehouse_id, quantity
          </li>
        </Box>
      </Paper>
    </Container>
  );
};

export default ImportPage;