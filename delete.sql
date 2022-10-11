USE [TickDB]
GO
/****** Object:  StoredProcedure [dbo].[delete_if_tick]    Script Date: 2022/8/18 17:03:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[delete_if_tick]
	--
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare @stockid varchar(20), @updatetime datetime, @max_updatetime datetime
	SET NOCOUNT ON
	declare cur CURSOR for
	select stockid, max(UpdateTime)  as max_updatetime
	from dbo.tb_tick_IF WITH (NOLOCK) group by Stockid

	open cur

	fetch next from cur into @stockid, @max_updatetime

	while @@FETCH_STATUS = 0 BEGIN
		--select * from dbo.tb_tick_IF where stockid=@stockid and updateTime <= @updatetime
		--select @stockid, @updatetime
		set @updatetime = DATEADD(n,-3,@max_updatetime)
		--select @updatetime ,@max_updatetime , @stockid
		delete from dbo.tb_tick_IF where stockid=@stockid and updateTime < @updatetime

		fetch next from cur into @stockid, @max_updatetime
	END

	close cur
	deallocate cur
END
