package fr.lesoiseauxdemer.service.implementations;

import org.springframework.stereotype.Service;

import fr.lesoiseauxdemer.service.interfaces.IAccueilService;

@Service
public class AccueilImplementation implements IAccueilService {

	@Override
	public String getMessageAccueil() {
		return "Hello world";
	}

}
