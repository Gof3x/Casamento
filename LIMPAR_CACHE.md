# 🔄 Como Limpar o Cache e Ver os Nomes Atualizados

## Opção 1: Limpar pelo Navegador (Fácil) ✅

1. Abra http://localhost:5173/
2. Pressione **F12** para abrir Developer Tools
3. Vá para a aba **Console**
4. Cole e execute este comando:

```javascript
// Limpa todos os dados salvos no localStorage
localStorage.clear();

// Depois recarregue a página
location.reload();
```

## Opção 2: Limpar pelo DevTools (Mais Prático)

1. Abra http://localhost:5173/
2. Pressione **F12** para abrir Developer Tools
3. Vá para **Application** ou **Storage**
4. No menu esquerdo, clique em **Local Storage**
5. Clique em `http://localhost:5173`
6. Selecione e delete as chaves:
   - `casamento-store`
   - `casa-store`
   - `ideias-store`
   - `convidados-store`
7. Pressione **F5** para recarregar

## Opção 3: Limpar Tudo (Mais Seguro)

1. Pressione **Ctrl + Shift + Delete** (ou Cmd + Shift + Delete no Mac)
2. Selecione:
   - ✅ Cookies and other site data
   - ✅ Cached images and files
3. Clique em **Clear data**
4. Recarregue a página

---

## ✅ O que Fazer Depois

Após limpar o localStorage:

1. A página vai carregar com os **novos nomes** ✨
2. Você verá: **José Ítalo ♥ Ana Luiza** na homepage
3. Todos os dados anteriores estarão zerados (com dados de exemplo)

---

## 🎯 Por que isso acontece?

O localStorage persiste dados no navegador mesmo depois de desligar. Como o Zustand foi configurado com `persist`, ele salvou os dados antigos (João e Maria) localmente. 

Quando você mudou os nomes no arquivo, o código-fonte mudou, mas o localStorage ainda tinha os nomes antigos guardados. Por isso não atualizou!

---

**Execute um dos comandos acima e pronto!** 🎉

Os novos nomes aparecem imediatamente!
