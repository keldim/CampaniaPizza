package com.chrisyoo.campaniapizzaserver.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.chrisyoo.campaniapizzaserver.entity.PastOrder;

public interface PastOrderService {
	public List<PastOrder> findAll();

	public PastOrder findById(int theId);

	public void save(PastOrder pastOrder);

	public void deleteById(int theId);
	
	public PastOrder createPastOrder(HttpServletRequest request) throws Exception;
}
