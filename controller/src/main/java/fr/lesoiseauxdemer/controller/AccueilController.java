package fr.lesoiseauxdemer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.lesoiseauxdemer.service.interfaces.IAccueilService;

/**
 * Le controller de la page d'accueil.
 * 
 * @author Jerome
 */
@RestController
public class AccueilController {

	@Autowired
	private IAccueilService accueil;

	@GetMapping(value = "/")
	public String getPageAcceuil() {
		return getAccueil().getMessageAccueil();
	}

	public IAccueilService getAccueil() {
		return accueil;
	}

}
