package api

import (
	"fmt"
	"io"
	"net/http"
)

func Get(url string) []byte {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
	req.Header.Set("Referer", "https://www.manhwaweb.com/")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error de red:", err)
		return nil
	}
	defer resp.Body.Close()

	bodyBytes, _ := io.ReadAll(resp.Body)

	return bodyBytes
}
