package services

import (
	"strconv"
	"strings"
	"tachi-desktop/models"
)

func MapManhwaCreated(raw []models.ManhwaCreatedRaw) []models.ManhwaCreated {
	manhwas := make([]models.ManhwaCreated, len(raw))
	for i, v := range raw {
		manhwas[i] = models.ManhwaCreated{
			ID:         v.ID,
			Title:      v.TheRealName,
			Image:      v.Imagen,
			Type:       v.Tipo,
			Demography: v.Demografia,
			IsErotic:   v.Erotico,
			Platform:   v.Plataforma,
			Categories: v.Categorias,
		}
	}
	return manhwas
}
func extractIDFromLink(link string) string {
	parts := strings.Split(link, "/")
	return parts[len(parts)-1]
}
func MapManhwasTopItem(raw []models.TopItemRaw) []models.TopItem {
	topItems := make([]models.TopItem, len(raw))
	for i, v := range raw {
		topItems[i] = models.TopItem{
			ID:     extractIDFromLink(v.Link),
			Name:   v.Name,
			Image:  v.Imagen,
			Status: v.Status,
			Caps:   v.Caps,
		}
	}
	return topItems
}
func buildChapterID(id string, chapter float64) string {
	return id + "-" + strconv.FormatFloat(chapter, 'f', -1, 64)
}
func MapManhwaDetail(raw []models.ManhwaDetail) []models.ChapterDetail {
	chapterDetails := make([]models.ChapterDetail, len(raw))
	for i, v := range raw {
		chapterDetails[i] = models.ChapterDetail{
			ID:         v.IDRel,
			Title:      v.NameManhwa,
			Link:       buildChapterID(v.IDRel, v.Chapter),
			Chapter:    v.Chapter,
			Image:      v.Img,
			Demography: v.Demografia,
			Type:       v.Tipo,
			IsLGBT:     v.LGBT,
		}
	}
	return chapterDetails
}
func MapHome(raw models.HomeRaw) models.Home {

	return models.Home{
		LastCreated:     MapManhwaCreated(raw.LasteManhwaCreated),
		LastCreatedNSFW: MapManhwaCreated(raw.LasteManhwaCreatedNSFW),
		Top: models.TopSection{
			TopWeekend: MapManhwasTopItem(raw.Top.ManhwasEsp),
			TopTotal:   MapManhwasTopItem(raw.Top.ManhwasRaw),
		},
		Chapters: models.ChaptersContainer{
			RecentNSFW: MapManhwaDetail(raw.Manhwas.Manhwas),
			RecentEsp:  MapManhwaDetail(raw.Manhwas.ManhwasEsp),
		},
	}
}
