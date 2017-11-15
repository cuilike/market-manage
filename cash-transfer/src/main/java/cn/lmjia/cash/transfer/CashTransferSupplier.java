package cn.lmjia.cash.transfer;

import cn.lmjia.cash.transfer.exception.BadAccessException;
import cn.lmjia.cash.transfer.exception.SupplierApiUpgradeException;
import cn.lmjia.cash.transfer.exception.TransferFailureException;
import cn.lmjia.cash.transfer.model.CashTransferResult;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.math.BigDecimal;

/**
 * 现金转账供应商
 *
 * @author CJ
 */
public interface CashTransferSupplier {

    /**
     *
     * @return 该供应商的名字
     */
    String getName();

    /**
     * @param owner 在单业务主场景下，这个参数是可选的
     * @return 可用余额
     * @throws IOException                 网络异常
     * @throws SupplierApiUpgradeException 供应商API需更新
     * @throws BadAccessException          访问密钥错误
     */
    BigDecimal queryBalance(EntityOwner owner) throws IOException, SupplierApiUpgradeException, BadAccessException;

    /**
     * 现金转账功能
     * @param ownerAccount 主体账户信息
     * @param receiver 转账信息
     * @throws IOException                 网络异常
     * @throws SupplierApiUpgradeException 供应商API需更新
     * @throws BadAccessException          访问密钥错误
     * @throws TransferFailureException     转账失败时异常
     * @return 结果信息.
     */
    CashTransferResult cashTransfer(OwnerAccount ownerAccount, CashReceiver receiver) throws IOException, SupplierApiUpgradeException, BadAccessException,TransferFailureException;

    /**
     * * 交易状态查询
     * @param ownerAccount 主体账户
     * @param receuver 需要查询的转账记录.
     * @return 结果信息.
     * @throws BadAccessException 登录失败时
     * @throws JsonProcessingException 对象与xml转换异常
     * @throws TransferFailureException 登录成功,但是转账失败
     */
    CashTransferResult statusQuery(OwnerAccount ownerAccount, CashReceiver receuver) throws BadAccessException, JsonProcessingException, TransferFailureException;

}