import { useMutation } from 'react-query';
import { NewsApiClient } from '../services/api';
import { ContactForm, ContactResponse } from '../types/api';

// 問い合わせメール送信フック
export const useContactForm = () => {
  return useMutation<ContactResponse, Error, ContactForm>({
    mutationFn: (form: ContactForm) => NewsApiClient.sendContactEmail(form),
    onError: (error: Error) => {
      console.error('問い合わせメール送信エラー:', error);
    },
  });
};

// メールサーバーヘルスチェックフック
export const useEmailHealthCheck = () => {
  return useMutation({
    mutationFn: () => NewsApiClient.checkEmailServerHealth(),
    onError: (error: Error) => {
      console.error('メールサーバーヘルスチェックエラー:', error);
    },
  });
}; 