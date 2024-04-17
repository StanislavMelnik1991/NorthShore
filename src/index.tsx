import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { PopupProvider } from './app/providers/Popup';
import { UserProvider } from './app/providers/UserProvider';
import '@app/styles/index.scss';
import '@shared/lib/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <PopupProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </PopupProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
