package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"tachi-desktop/api"
	"tachi-desktop/libs"
	"tachi-desktop/models"
	"tachi-desktop/services"
)

const baseUrl = "https://manhwawebbackend-production.up.railway.app"

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetManhwaHome() models.Home {
	ul, err := url.Parse(baseUrl + "/manhwa/nuevos")
	if err != nil {
		return models.Home{}
	}
	body := api.Get(ul.String())

	var resultRaw models.HomeRaw
	err = json.Unmarshal(body, &resultRaw)

	if err != nil {
		fmt.Println("ERROR DE PARSEO JSON:", err)
		return models.Home{}
	}
	return services.MapHome(resultRaw)
}

func (a *App) GetManhwaView(id string) models.ManhwaView {
	if id == "" {
		return models.ManhwaView{}
	}
	ul, err := url.Parse(baseUrl + "/chapters/see")
	if err != nil {
		return models.ManhwaView{}
	}
	ulNav, errNav := url.Parse(baseUrl + "/chapters/seeprevpost")
	if errNav != nil {
		return models.ManhwaView{}
	}

	fullUrlNav := ulNav.JoinPath(id)
	fullUrl := ul.JoinPath(id)

	body := api.Get(fullUrl.String())
	bodyNav := api.Get(fullUrlNav.String())

	var resultRaw models.ManhwaViewRaw
	err = json.Unmarshal(body, &resultRaw)
	var navRaw models.NavigationRaw
	errNav = json.Unmarshal(bodyNav, &navRaw)

	if err != nil {
		fmt.Println("ERROR DE PARSEO JSON:", err)
		return models.ManhwaView{}
	}
	return services.MapManhwaViewRawToManhwaView(resultRaw, navRaw)
}

func (a *App) GetManhwaDetails(id string) models.ManhwaDetails {
	if id == "" {
		return models.ManhwaDetails{}
	}
	ul, err := url.Parse(baseUrl + "/manhwa/see")
	if err != nil {
		return models.ManhwaDetails{}
	}
	fullUrl := ul.JoinPath(id)

	body := api.Get(fullUrl.String())

	var resultRaw models.ManhwaRawDetails
	err = json.Unmarshal(body, &resultRaw)

	if err != nil {
		fmt.Println("ERROR DE PARSEO JSON:", err)
		return models.ManhwaDetails{}
	}
	return services.MapManhwa(resultRaw)
}

func (a *App) GetSearchResults(query string, page int) models.SearchData {
	ul, err := url.Parse(baseUrl + "/manhwa/library")
	if err != nil {
		return models.SearchData{}
	}
	q := ul.Query()
	q.Set("erotico","no")
	q.Set("buscar", query)
	q.Set("page", fmt.Sprintf("%d", page))
	ul.RawQuery = q.Encode()
	fmt.Println(ul.String())
	body := api.Get(ul.String())

	var resultRaw models.SearchRaw
	err = json.Unmarshal(body, &resultRaw)

	if err != nil {
		fmt.Println("ERROR DE PARSEO JSON:", err)
		return models.SearchData{}
	}
	var results models.SearchData
	results.Results = libs.Map(resultRaw.Data, services.MapToDomain)
	results.Next = resultRaw.Next

	return results
}
