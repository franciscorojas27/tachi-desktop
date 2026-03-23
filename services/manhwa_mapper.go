package services

import (
	"path"
	"tachi-desktop/models"
)

func MapManhwa(dto models.ManhwaRawDetails) models.ManhwaDetails {
	cleanCategories := []models.Category{}

	if len(dto.Categoris) > 0 {
		for _, catMap := range dto.Categoris {
			for id, name := range catMap {
				cleanCategories = append(cleanCategories, models.Category{
					ID:   id,
					Name: name,
				})
			}
		}
	}

	if len(dto.Chapters) != 0 {
		for i := range dto.Chapters {
			dto.Chapters[i].Link = path.Base(dto.Chapters[i].Link)
		}
	}

	return models.ManhwaDetails{
		ID:           dto.ID,
		Name:         dto.Name,
		Platform:     dto.Plataforma,
		Image:        dto.Imagen,
		Status:       dto.Status,
		Categories:   cleanCategories,
		Synopsis:     dto.Sinopsis,
		ChapterCount: dto.NumeroCap,
		TheRealName:  dto.TheRealName,
		LinkSpanish:  dto.LinkEsp,
		NameSpanish:  dto.NameEsp,
		IsErotic:     dto.Erotico == "true",
		Type:         dto.Tipo,
		Demography:   dto.Demografi,
		RealID:       dto.RealID,
		Popularity:   dto.Popularidad,
		Chapters:     dto.Chapters,
		Authors:      dto.Extras.Autores,
		IsHiatus:     dto.Extras.Hiatus,
		HiatusImages: dto.Extras.HiatusImagenes,
	}
}
