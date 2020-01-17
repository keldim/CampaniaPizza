package com.chrisyoo.campaniapizzaserver.service;

import java.util.List;

import com.chrisyoo.campaniapizzaserver.entity.PastOrder;

public interface PastOrderService {
	public List<PastOrder> findAll();

	public PastOrder findById(int theId);

	public void save(PastOrder pastOrder);

	public void deleteById(int theId);
}
