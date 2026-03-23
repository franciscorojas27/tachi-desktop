package services

import (
	"net/url"
	"path"
	"strings"
	"tachi-desktop/models"
)

func normalizeNavigation(nav models.NavigationRaw) models.Navigation {
	prevSlug, prevNum := "", ""
	preUrl, errPre := url.Parse(nav.ChapterAnterior)
	if errPre == nil && preUrl.Path != "" && preUrl.Path != "/" {
		prevSlug = path.Base(preUrl.Path)
		parts := strings.Split(prevSlug, "-")
		if len(parts) > 1 {
			prevNum = parts[len(parts)-1]
		}
	}

	nextSlug, nextNum := "", ""
	nextUrl, errNext := url.Parse(nav.ChapterSiguiente)
	if errNext == nil && nextUrl.Path != "" && nextUrl.Path != "/" {
		nextSlug = path.Base(nextUrl.Path)
		parts := strings.Split(nextSlug, "-")
		if len(parts) > 1 {
			nextNum = parts[len(parts)-1]
		}
	}

	return models.Navigation{
		PreviousChapter: models.NavigationChapter{
			ID:      prevSlug,
			Chapter: prevNum,
		},
		NextChapter: models.NavigationChapter{
			ID:      nextSlug,
			Chapter: nextNum,
		},
	}
}

func MapManhwaViewRawToManhwaView(raw models.ManhwaViewRaw, nav models.NavigationRaw) models.ManhwaView {

	navigation := normalizeNavigation(nav)

	return models.ManhwaView{
		ID:         raw.ID,
		Name:       raw.Name,
		Chapter:    raw.Chapters.Chapter,
		Images:     raw.Chapters.Img,
		Navigation: navigation,
	}
}
